type Empleado = {
    Id_Empleado: string;
    nombre: string;
    tieneAcceso: boolean;
    proximoHorario: number,
}

export const empleados: Empleado[] = [
    {
      Id_Empleado: "4256",
      nombre: "Juan Pérez",
      tieneAcceso: true,
      proximoHorario: 7,
    },
    {
      Id_Empleado: "1234",
      nombre: "María López",
      tieneAcceso: true,
      proximoHorario: 14,
    },
    {
      Id_Empleado: "9876",
      nombre: "Pedro García",
      tieneAcceso: true,
      proximoHorario: 14,
    },
    {
      Id_Empleado: "5678",
      nombre: "Ana Martínez",
      tieneAcceso: true,
      proximoHorario: 7,
    },
    {
      Id_Empleado: "2345",
      nombre: "Luis Rodríguez",
      tieneAcceso: true,
      proximoHorario: 7,
    },
    {
      Id_Empleado: "7890",
      nombre: "Laura Gómez",
      tieneAcceso: false,
      proximoHorario: 14,
    },
    {
      Id_Empleado: "4567",
      nombre: "Carlos Sánchez",
      tieneAcceso: true,
      proximoHorario: 7,
    },
    {
      Id_Empleado: "3456",
      nombre: "Marcela Ramírez",
      tieneAcceso: true,
      proximoHorario: 7,
    },
    {
      Id_Empleado: "6789",
      nombre: "Diego Pérez",
      tieneAcceso: true,
      proximoHorario: 7,
    },
    {
      Id_Empleado: "8901",
      nombre: "Sofía López",
      tieneAcceso: false,
      proximoHorario: 14,
    },
    // Agrega más empleados aquí...
];

export const filtraPorId = (filtro: string) => {
  let indice = 0;
  const empleadosFiltrados = empleados.filter((empleado, index) => {
      if (empleado.Id_Empleado.toLowerCase().includes(filtro.toLowerCase())) {
          indice= index;
          return true
      }
  });
    
  return {
      empleadosFiltrados,
      indice,
  };
}
export const aniadirEmpleado = (data: Empleado) => {
  empleados.push(data);
}
export const eliminarEmpleado = (index:  number) =>  {
  empleados.splice(index, 1);
}