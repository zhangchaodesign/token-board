import pandas as pd
from itertools import product

def split_model_name(model_name):
    parts = model_name.split('/')
    if len(parts) > 1:
        return parts[0], '/'.join(parts[1:])
    else:
        return "Unknown", model_name  # Handling cases without a '/'

def preprocess_data(file_path):
    # Load the data
    data = pd.read_csv(file_path, sep='\t')
    
    # Calculate the total number of tokens in each category for each model
    category_counts = data.groupby(['model_name', 'token_category']).size().reset_index(name='count')
    
    # Calculate the total number of tokens for each model
    total_counts = data.groupby(['model_name']).size().reset_index(name='total')
    
    # Merge the counts with the total tokens for each model
    category_counts = category_counts.merge(total_counts, on='model_name')
    
    # Get all unique categories
    unique_categories = category_counts['token_category'].unique()
    
    # Create a complete grid of models and categories with all possible combinations
    unique_models = category_counts['model_name'].unique()
    model_category_combinations = pd.DataFrame(list(product(unique_models, unique_categories)), columns=['model_name', 'token_category'])
    model_category_combinations = model_category_combinations.merge(category_counts, on=['model_name', 'token_category'], how='left').fillna(0)
    
    # Pivot the data to get counts and percentages in the required format
    count_pivot = model_category_combinations.pivot(index='model_name', columns='token_category', values='count').reset_index().fillna(0)
    count_pivot = count_pivot.merge(total_counts, on='model_name')
    
    # Generate the data structure for JavaScript
    data_js = [{
        'company': split_model_name(row['model_name'])[0],
        'model': split_model_name(row['model_name'])[1],
        'total': row['total'],
        'count': {category: int(row.get(category, 0)) for category in unique_categories},
        'percentage': {category: round(float(row.get(category, 0.0) / row['total'] * 100), 4) if row['total'] > 0 else 0.0 for category in unique_categories}
    } for index, row in count_pivot.iterrows()]
    
    # Write to a JavaScript file
    js_code = "const DATA = " + str(data_js) + ";\n\nexport default DATA;"
    output_path = 'data.js'
    with open(output_path, 'w') as f:
        f.write(js_code)
    
    return output_path

if __name__ == "__main__":
    # File path to the dataset
    file_path = 'all_tokens.tsv'
    output_file = preprocess_data(file_path)
    print(f'Processed data saved to {output_file}')
