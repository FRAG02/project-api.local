const __API_PATH = "http://project-api.local/";

const fetchData = async (url, method = "GET", body = null) => {
    const options = {
        method,
    };

    if (body && method !== 'GET') {
        if (body instanceof FormData) {
            options.body = body;
        } else {
            options.body = JSON.stringify(body);
        }
    }

    let fullUrl = `${__API_PATH}${url}`;
    if (method === 'GET' && body) {
        const params = new URLSearchParams(body);
        fullUrl += `?${params.toString()}`;
    }

    const response = await fetch(fullUrl, options)
    return response.json();
};

// Метод для авторизации
export const login = async (username, password) => fetchData('login', "POST", { username, password });

// Метод для регистрации
export const register = async (username, password) => fetchData('register', "POST", { username, password });

// Метод для получения подразделений
export const getDepartments = async (setFunc) => fetchData('departments').then(data => setFunc(data));

// Метод для получения МОЛ
export const getMOLs = async (setFunc) => fetchData('mols').then(data => setFunc(data));

// Метод для получения оборудования
export const getEquipment = async (setFunc) => fetchData('equipment').then(data => setFunc(data));

// Метод для получения подразделений
export const getDepartmentsById = async (setFunc, id) => fetchData(`departments/${id}`).then(data => setFunc(data[0]));

// Метод для получения МОЛ
export const getMOLsById = async (setFunc, id) => fetchData(`mols/${id}`).then(data => setFunc(data[0]));

// Метод для получения оборудования
export const getEquipmentById = async (setFunc, id) => fetchData(`equipment/${id}`).then(data => setFunc(data[0]));


// Метод для получения подразделений
export const createUpdDepartments = async (id, data) => fetchData(`departments${id ? `/${id}` : ""}`, "POST", data);

// Метод для получения МОЛ
export const createUpdMOLs = async (id, data) => fetchData(`mols${id ? `/${id}` : ""}`, "POST", data);

// Метод для получения оборудования
export const createUpdEquipment = async (id, data) => fetchData(`equipment${id ? `/${id}` : ""}`, "POST", data);




// Метод для удаления подразделений
export const removeDepartments = async (id) => fetchData(`remove-departments/${id}`);

// Метод для удаления МОЛ
export const removeMOLs = async (id) => fetchData(`remove-mols/${id}`);

// Метод для удаления оборудования
export const removeEquipment = async (id) => fetchData(`remove-equipment/${id}`);