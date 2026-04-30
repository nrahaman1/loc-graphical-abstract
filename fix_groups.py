import json

path = 'C:/Users/nafiz/OneDrive - Mississippi State University/DARPA_Project/LOC_Graphical_Abstract/data/loc_graph.json'

with open(path, 'r') as f:
    data = json.load(f)

# Iterate and update group mapping
for node in data['nodes']:
    # Fix category nodes
    if node['id'].startswith('LOC_'):
        cat = node['id'].replace('LOC_', '')
        if 'Bird' in cat:
            node['group'] = 10
        elif 'Soil' in cat:
            node['group'] = 11
        elif 'Physical' in cat:
            node['group'] = 12
        elif 'All' in cat:
            node['group'] = 6
    else:
        # Check parents to inherit group correctly
        # The parent is the source in links
        parent_link = next((l for l in data['links'] if l['target'] == node['id'] and str(l['source']).startswith('LOC_')), None)
        if parent_link:
            source_id = parent_link['source']
            if 'Bird' in source_id:
                node['group'] = 10
            elif 'Soil' in source_id:
                node['group'] = 11
            elif 'Physical' in source_id:
                node['group'] = 12
            elif 'All' in source_id:
                node['group'] = 6

with open(path, 'w') as f:
    json.dump(data, f, indent=2)

print('Updated groups successfully!')
