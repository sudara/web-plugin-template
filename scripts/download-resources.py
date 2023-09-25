import argparse
import os
import yaml
import requests
import zipfile
from pathlib import Path
import sys

argParser = argparse.ArgumentParser()
argParser.add_argument("-p", "--product", help="product name", required=True)
argParser.add_argument('-d', '--delete', action='store_true')

args = argParser.parse_args()

product = args.product
deleteSpec = args.delete

product_resource_dir = f"{sys.path[0]}/../plugins/{product}/resources"
print(product_resource_dir)

def extract_file(file, delete_original):
    print(f"extracting {file}")
    with zipfile.ZipFile(file, 'r') as zip_ref:
        parent_dir = Path(file).parent.absolute()
        zip_ref.extractall(parent_dir)

    if (delete_original):
        os.remove(file)

def download_file(downloadFilePath):
    print(f"downloading {downloadFilePath}")
    with open(downloadFilePath, "r") as stream:
        try:
            dl_spec = yaml.safe_load(stream)
            if (dl_spec):
                dlFile = os.path.splitext(downloadFilePath)[0]
                extract = False
                if (dl_spec.get("extract") is not None):
                    extract = dl_spec['extract']

                if (extract == True):
                    dlFile += '.zip'

                if (os.path.isfile(dlFile)):
                    print(f"{dlFile} already downloaded, not redownloading")
                else:
                    response = requests.get(dl_spec['url'])
                    open(dlFile, 'wb').write(response.content);

                if (extract == True):
                    extract_file(dlFile, deleteSpec)

            else:
                print("invalid dl_spec config")
        except yaml.YAMLError as exc:
            print(exc)


    if (deleteSpec):
        os.remove(downloadFilePath)



def parse_file(path):
    filename, file_extension = os.path.splitext(path)
    if (file_extension == ".download"):
        download_file(path)


for path, subdirs, files in os.walk(product_resource_dir):
    for name in files:
        parse_file(os.path.join(path, name))
