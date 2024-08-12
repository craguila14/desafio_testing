const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    //Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto.

    it("Obteniendo un 200", async () => {
        const response = await request(server).get("/cafes").send();
        expect(response.statusCode).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBeGreaterThan(0)
    })

    //Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe. (2 Puntos)

    it("Eliminando un cafe", async () => {
        const jwt = "token"
        const idDeCafeAEliminar = 5
        const response = await request(server)
            .delete(`/cafes/${idDeCafeAEliminar}`)
            .set("Authorization", jwt)
        expect(response.statusCode).toBe(404)
            
    })

    //Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.

    it("Agregando un nuevo cafe", async () => {
        const id = 5
        const cafe = {id, nombre: "Macchiato"}

        const response = await request(server)
            .post("/cafes")
            .send(cafe)
        expect(response.statusCode).toBe(201)
        const cafes = response.body
        expect(cafes).toContainEqual(cafe)
    })

    //Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.

    it("Obteniendo un 400", async () => {
        const validId = 1
        const updatedCafe = {
            id: 6,
            nombre: "Cafe actualizado"
        }

        const response = await request(server)
            .put(`/cafes/${validId}`)
            .send(updatedCafe)
        expect(response.statusCode).toBe(400)
    })

});
