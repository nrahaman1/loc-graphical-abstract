document.addEventListener('DOMContentLoaded', () => {
    
    // UI Elements
    const dataPanel = document.getElementById('data-panel');
    const closeBtn = document.getElementById('close-panel');
    const btnExpandAll = document.getElementById('btn-expand-all');
    const btnCollapseAll = document.getElementById('btn-collapse-all');
    
    const nodeTag = document.getElementById('node-tag');
    const nodeTitle = document.getElementById('node-title');
    const nodeObservable = document.getElementById('node-observable');
    const nodeAbility = document.getElementById('node-ability');
    const nodeGapType = document.getElementById('node-gap-type');
    const nodeGapDesc = document.getElementById('node-gap-desc');
    const nodeCandidate = document.getElementById('node-candidate');
    const nodeWhy = document.getElementById('node-why');
    const nodeFuture = document.getElementById('node-future');

    closeBtn.addEventListener('click', () => {
        dataPanel.classList.add('hidden');
    });

    const colorMap = {
        0: '#ffffff', // Central Node
        1: '#10b981', // Biological
        2: '#3b82f6', // Atmospheric
        3: '#f59e0b', // Trade
        4: '#ec4899', // Human
        5: '#8b5cf6', // Insect
        6: '#ef4444', // Destination
        7: '#06b6d4', // Hydrospheric
        8: '#f43f5e', // Information/Cross-Dependencies
        9: '#94a3b8', // Unknown
        10: '#fcd34d', // Bird Migration
        11: '#84cc16', // Soil
        12: '#fb923c'  // Generic Physical
    };

    let fullData = { nodes: [], links: [] };
    let expandedCategories = new Set();
    
    const Graph = ForceGraph3D()(document.getElementById('3d-graph'))
        .nodeLabel('label')
        .nodeColor(node => colorMap[node.group] || colorMap[9])
        .nodeVal('val')
        .nodeOpacity(0.9)
        .nodeResolution(32)
        .linkOpacity(0.3)
        .linkWidth(1.5)
        .linkColor(() => 'rgba(255,255,255,0.2)')
        .linkDirectionalParticles(2)
        .linkDirectionalParticleWidth(2)
        .linkDirectionalParticleSpeed(0.005)
        .backgroundColor('#050510')
        .onNodeClick(node => {
            const distance = 150;
            const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

            Graph.cameraPosition(
                { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
                node,
                1500
            );

            // Logic for Category Node
            if(node.group === 0 || node.id.startsWith("LOC_")) {
                if (node.id.startsWith("LOC_")) {
                    if (expandedCategories.has(node.id)) {
                        expandedCategories.delete(node.id);
                    } else {
                        expandedCategories.add(node.id);
                    }
                    updateGraphData();
                }

                nodeTag.textContent = "CATEGORY";
                nodeTag.style.color = colorMap[node.group];
                nodeTag.style.background = `${colorMap[node.group]}22`;
                nodeTag.style.borderColor = `${colorMap[node.group]}55`;
                
                nodeTitle.textContent = node.label;
                nodeObservable.textContent = node.description || "Main routing hub for this Line of Communication.";
                
                document.querySelectorAll('.data-group').forEach((el, idx) => {
                    if(idx > 0) el.style.display = 'none';
                });
            } else {
                // Detailed Process Node
                nodeTag.textContent = node.stage || "PROCESS";
                nodeTag.style.color = colorMap[node.group];
                nodeTag.style.background = `${colorMap[node.group]}22`;
                nodeTag.style.borderColor = `${colorMap[node.group]}55`;

                nodeTitle.textContent = node.label;
                
                nodeObservable.innerHTML = node.observable || '<em>N/A</em>';
                nodeAbility.innerHTML = node.current_ability || '<em>N/A</em>';
                
                nodeGapType.textContent = node.gap_type || 'Gap Description';
                nodeGapDesc.innerHTML = node.gap_desc || '<em>N/A</em>';
                
                nodeCandidate.innerHTML = node.candidate_data || '<em>N/A</em>';
                nodeWhy.innerHTML = node.why_matters || '<em>N/A</em>';
                nodeFuture.innerHTML = node.future_dev || '<em>N/A</em>';

                document.querySelectorAll('.data-group').forEach(el => el.style.display = 'block');
            }

            dataPanel.classList.remove('hidden');
        })
        .onNodeHover(node => {
            document.body.style.cursor = node ? 'pointer' : null;
        });

    function updateGraphData() {
        const visibleNodes = fullData.nodes.filter(n => {
            if (n.group === 0) return true; // Center
            if (n.id.startsWith("LOC_")) return true; // Category roots
            const parentLink = fullData.links.find(l => 
                (typeof l.target === 'object' ? l.target.id : l.target) === n.id
            );
            if (!parentLink) return true;
            
            const sourceId = typeof parentLink.source === 'object' ? parentLink.source.id : parentLink.source;
            return expandedCategories.has(sourceId);
        });

        const visibleNodeIds = new Set(visibleNodes.map(n => n.id));
        const visibleLinks = fullData.links.filter(l => {
            const sid = typeof l.source === 'object' ? l.source.id : l.source;
            const tid = typeof l.target === 'object' ? l.target.id : l.target;
            return visibleNodeIds.has(sid) && visibleNodeIds.has(tid);
        });

        Graph.graphData({ nodes: visibleNodes, links: visibleLinks });
    }

    // Fetch data and init
    fetch('data/loc_graph.json').then(res => res.json()).then(data => {
        fullData = data;
        expandedCategories.clear();
        updateGraphData();
    });

    btnExpandAll.addEventListener('click', () => {
        fullData.nodes.forEach(n => {
            if (n.id.startsWith("LOC_")) expandedCategories.add(n.id);
        });
        updateGraphData();
    });

    btnCollapseAll.addEventListener('click', () => {
        expandedCategories.clear();
        updateGraphData();
    });
});
