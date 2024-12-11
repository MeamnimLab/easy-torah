import os
import shutil
from tempfile import mkdtemp

BASE_PATH = "./server/src"
TEMPLATE_PATH = "./server/src/templates"
FOLDERS = ["routes", "controllers", "services", "repositories", "entities", "interfaces"]


INDEX_UPDATE = "import {Resource}Route from './routes/{resource_lc}.route';\napp.use('/api/{resource_lc}', new {Resource}Route().router);\n"

# Create folders and files
def create_structure(resource_name):
    resource_lc = resource_name.lower()
    resource_uc = resource_name.capitalize()

    # Create a temporary directory for safe file generation
    temp_dir = mkdtemp()
    try:
        # Create files in the existing folder (no subfolder for routes)
        for folder in FOLDERS:
            folder_path = os.path.join(BASE_PATH, folder)  # Directly target the 'routes' folder
            print(f"Creating files in: {folder_path}")

            # Make sure the folder exists
            os.makedirs(folder_path, exist_ok=True)

            # Read and write template files
            template_file = os.path.join(TEMPLATE_PATH, f"{folder}.template")
            if os.path.exists(template_file):
                with open(template_file, "r") as template:
                    content = template.read().replace("{Resource}", resource_uc).replace("{resource_lc}", resource_lc)

                # Save the file directly to the 'routes' folder
                if folder[-3:] == 'ies':
                    output_file = os.path.join(folder_path, f"{resource_lc}.{folder[:-3]}y.ts")
                else:
                    output_file = os.path.join(folder_path, f"{resource_lc}.{folder[:-1]}.ts")
                
                with open(output_file, "w") as file:
                    file.write(content)
                    print(f"Created file: {output_file}")

        # Update index.ts in the temporary directory
        print("Updating index.ts")
        index_path = os.path.join(BASE_PATH, "index.ts")
        temp_index_path = os.path.join(temp_dir, "index.ts")

        if os.path.exists(index_path):
            with open(index_path, "r") as file:
                index_content = file.read()

            # Insert the new import above the comment without replacing the comment
            new_import = f"import {resource_uc}Route from './routes/{resource_lc}.route';\n"
            end_import_comment = '// end of imports\n'
            if f"import {resource_uc}Route" not in index_content:
                index_content = index_content.replace(end_import_comment, new_import + end_import_comment)

            # Append the new app.use route before the comment without replacing it
            new_route = f"app.use('/api/{resource_lc}', new {resource_uc}Route().router);\n"
            end_routes_comment = '// end of app.use\n'
            if f"/api/{resource_lc}" not in index_content:
                index_content = index_content.replace(end_routes_comment, new_route + end_routes_comment)

            with open(temp_index_path, "w") as temp_index_file:
                temp_index_file.write(index_content)

        # Replace the updated index.ts file
        if os.path.exists(temp_index_path):
            shutil.move(temp_index_path, index_path)
            print(f"Moved {temp_index_path} to {index_path}")

        print(f"Files and routes for {resource_name} created successfully.")
    except Exception as e:
        print(f"An error occurred: {e}. No changes were saved.")
    finally:
        # Clean up the temporary directory, even if an error occurs
        shutil.rmtree(temp_dir, ignore_errors=True)

# Input from user
if __name__ == "__main__":
    resource_name = input("Enter the resource name (e.g., Animal): ")
    create_structure(resource_name)
