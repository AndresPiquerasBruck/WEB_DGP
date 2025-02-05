import axios from "axios"
import React, { Component } from "react"
import { Link } from 'react-router-dom'
import Header from "./Header"
import { SERVER_HOST } from "../config/global_constants"
import "../css/AdminAlumPrincipal.css"
import "../css/ListaActividades.css"

// // Datos de prueba
// function createData(nombre, key) {
//    return {
//       nombre, key
//    };
// }
// const tableData = [
//    createData('Actividad1', '1'),
//    createData('Actividad2', '2'),
//    createData('Actividad3', '3'),
//    createData('Actividad4', '4'),
// ];

const ActRow = ({ nombre }) => {
   return (
      <tr>
         <td>{`${nombre}`}</td>
      </tr>
   );
};

export default class ListaActividades extends Component {
   constructor(props) {
      super(props);
      this.state = {
         error: null,
         mounted: false,
         search: "",
         actividades: [],
         muestraActividades: []
      };
      this.showTable = this.showTable.bind(this);
      this.sortResults = this.sortResults.bind(this);
   }

   componentDidMount() {
      axios.get(
         `${SERVER_HOST}/actividades/getAll`,
         { headers: { "Content-type": "multipart/form-data" } })
         .then(res => {
            if (res.data) {
               if (res.data.errorMessage) {
                  alert("No se han podido tomar los datos " + res.data.errorMessage);
                  console.log(res.data.errorMessage)
                  this.setState({ error: res.data.errorMessage });
               } else {
                  let getData = JSON.parse(JSON.stringify(res.data).toString());
                  let saveData = [];
                  for (let i = 0; i < getData.length; i++) {
                     saveData.push({ nombre: getData[i].nombre, key: getData[i]._id });
                  }
                  // this.setState({ actividades: tableData, muestraActividades: tableData, mounted: true });
                  this.setState({ actividades: saveData, muestraActividades: saveData, mounted: true });
               }
            } else {
               this.setState({ error: "No se han encontrado actividades" });
               console.log("No se han encontrado actividades")
            }
         })
   }

   filterResults = (query, results) => {
      return results.filter(actividad => {
         const name = actividad.nombre.toLowerCase();

         return name.includes(query);
      });
   };

   // sortResults(event) {
   sortResults = event => {
      this.setState(prevState => {
         const { muestraActividades, sortOrder } = prevState;
         if (sortOrder === "desc") {
            muestraActividades.sort((a, b) => {
               if (a.nombre > b.nombre) {
                  return -1;
               }
               return a.nombre > b.nombre ? 1 : 0;
            });
         } else {
            muestraActividades.sort((a, b) => {
               if (a.nombre < b.nombre) {
                  return -1;
               }
               return a.nombre < b.nombre ? 1 : 0;
            });
         }
         return {
            muestraActividades,
            sortOrder: sortOrder === "desc" ? "asc" : "desc"
         };
      });
   };

   onChange = e => {
      const query = e.target.value;
      this.setState(prevState => ({
         muestraActividades:
            query.length > 0
               ? this.filterResults(query, prevState.actividades)
               : prevState.actividades
      }));
   };

   showTable() {
      const pictos = [];
      // for (let i = 0; i < this.state.muestraActividades; i++) {
      let i = 0;
      pictos.push(
         <div key={i++}>
            <div className="buscarActividad">
               <input label="Search" onChange={this.onChange} placeholder="Buscar Actividad..." />
            </div>
            <div>
               <table className="table table-bordered" >
                  <tbody>
                     <tr>
                        <th
                           style={{ cursor: "pointer" }}
                           onClick={this.sortResults}
                           // onClick={() => { this.sortResults() }}
                           id="name"
                        >
                           Actividades
                        </th>
                     </tr>
                     {this.state.muestraActividades.map(item => (
                        <ActRow
                           nombre={item.nombre}
                           key={item.key}
                        />
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      );
      return pictos;
   }

   render() {
      return (
         <div className="web-container">
            <Header />
            <h1>Listado de actividades</h1>
            {this.state.error ? <div>Error: {this.state.error.message}</div> : null}
            {this.state.mounted ? null : <div> Cargando actividades... </div>}
            <div className="left">
               {this.showTable()}
               <div>
               </div>
            </div>
            <div className="right">
               <div className="botonesContainer">
                  <Link to="/AddActividad"><input id="addActividad" type="button" value="AÑADIR ACTIVIDAD" /></Link>
                  {/* <input id="modificar" type="button" className="" value="MODIFICAR TAREA" /> */}
                  <Link to="/ListaTareas"><input id="toggleATareas" type="button" value="VER TAREAS ASIGNADAS" /></Link>
               </div>
            </div>
         </div>
      )
   }
}
