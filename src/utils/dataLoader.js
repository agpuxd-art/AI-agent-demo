import Papa from 'papaparse';

export const loadCSV = async (url) => {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error)
    });
  });
};

export const loadProjectData = async () => {
  try {
    const projects = await loadCSV('/projects_masked.csv');
    const tasks = await loadCSV('/tasks_masked.csv');
    return { projects, tasks };
  } catch (err) {
    console.error("Error loading CSV data", err);
    return { projects: [], tasks: [] };
  }
};
