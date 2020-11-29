import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
} from "../types";

//Importar cliente de axios
import clienteAxios from "../config/axios";

import Swal from "sweetalert2";

//Crear nuevos productos
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());
    try {
      //Insertar producto en la api
      await clienteAxios.post("/productos", producto);

      //Si todo sale bien actualizar el state
      dispatch(agregarProductoExito(producto));

      //Alerta
      Swal.fire("Correcto", "El producto se agregó correctamente", "success");
    } catch (error) {
      console.log(error);
      //Si hay un error cambiar el state
      dispatch(agregarProductoError(true));

      //Alerta de error
      Swal.fire({
        icon: "error",
        title: "Ocurrio un error",
        text: "Algo pasó :( Intentalo de nuevo",
      });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
});

//Si el producto se guarda en la base de dato
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});
