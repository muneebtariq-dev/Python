from abc import ABC, abstractmethod
import json


# Can Change the file name:

FILE_NAME = "data.json"


class DataProcessor(ABC):

    @abstractmethod
    def load_data(self):
        pass

    @abstractmethod
    def process_data(self):
        pass

    @abstractmethod
    def save_data(self):
        pass


class JSONProcessor(DataProcessor):

    def __init__(self, filename):
        self.filename = filename
        self.data = None

    def load_data(self):
        with open(self.filename, "r", encoding="utf-8") as file:
            self.data = json.load(file)

    def process_data(self):
        if isinstance(self.data, list):
            for item in self.data:
                if isinstance(item, dict):
                    for key, value in item.items():
                        if isinstance(value, str):
                            item[key] = value.upper()

        elif isinstance(self.data, dict):
            for key, value in self.data.items():
                if isinstance(value, str):
                    self.data[key] = value.upper()

    def save_data(self):
        with open(self.filename, "w", encoding="utf-8") as file:
            json.dump(self.data, file, indent=4)


# Create an object and run the processing
processor = JSONProcessor(FILE_NAME)

processor.load_data()
processor.process_data()
processor.save_data()

print("Processing completed successfully.")