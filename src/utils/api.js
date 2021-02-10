const baseUrl = 'http://localhost:8080';
const myHeader = new Headers({
    'Content-Type': 'application/json'
});

export const getCars = async () => {
    const response = await fetch(baseUrl + '/carros', {
        method: 'GET',
        headers: myHeader,
    });

    return response;
}

export const getCarById = async (id) => {
    const response = await fetch(baseUrl + '/carros/' + id, {
        method: 'GET',
        headers: myHeader,
    });

    return response;
}

export const updateCar = async (carroParams) => {
    const response = await fetch(baseUrl + '/carros/' + carroParams.id, {
        method: 'PUT',
        body: JSON.stringify(carroParams),
        headers: myHeader,
    });

    return response;
}

export const deleteCar = async (id) => {
    const response = await fetch(baseUrl + '/carros/' + id, {
        method: 'DELETE',
        headers: myHeader,
    });

    return response;
}

export const addCar = async (carroParams) => {
    const response = await fetch(baseUrl + '/carros/cadastrar', {
        method: 'POST',
        headers: myHeader,
        body: JSON.stringify(carroParams),
    });

    return response;
}