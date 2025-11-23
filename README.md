# [📃BACON - Balance Contable Online🥓](https://bacon-beta.vercel.app/)

[![React Badge](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=for-the-badge)](https://react.dev/)
[![Vite Badge](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=for-the-badge)](https://vite.dev/)

**Versión:** 0.1

**Descripción:** **BACON** (*Balance Contable Online*) es un sistema web diseñado para registrar y clasificar cuentas, generar asientos de diario y estados financieros básicos.
Su objetivo es brindar una herramienta simple, educativa y funcional que aplique principios de ingeniería de software, patrones de diseño y buenas prácticas de arquitectura.

**Objetivo:** Desarrollar un sistema con diseño modular y escalable que implemente principios de contabilidad básica y permita la evolución hacia un software financiero más completo mediante el uso del diseño en capas y patrones de diseño.

---

## 1. Idea / Resumen del proyecto

Una herramienta web para llevar la contabilidad básica de un emprendedor, una persona o para prácticar y corroborar nociones básicas de la materia. La cual permite:

* Tener un **plan de cuentas** (activos, pasivos, patrimonio, ingresos, gastos).
* Registrar **asientos de diario** (debe y haber).
* Validar que cada asiento cuadre (suma del debe = suma del haber).
* Generar **estados financieros** por periodo: Balance General y Estado de Resultados.
* Exportar reportes (CSV/PDF).

---

## 2. Especificaciones técnicas

### 2.1 Arquitectura general

* **Presentación (Frontend)**: UI/UX, validaciones de entrada mínimas, vistas de plan de cuentas, asientos y reportes.
* **Lógica de negocio (Backend)**: reglas contables (validación de asientos, generación de estados).

### 2.2 Patrones de diseño

* **Facade** — unificar y exponer operaciones complejas como “generar estado financiero” que orquesta múltiples repositorios y cálculos.
* **Factory** — crear plantillas de asientos (p. ej. cierre mensual, nómina).
* **Strategy** — permitir distintos métodos de cálculo o agregación (por ejemplo, diferentes reglas de consolidación o filtros fiscales).

### 2.3 Modelo de datos

* **Información sobre la cuenta**: Nombre de la cuenta, su naturaleza (acreedora o deudora), usos comunes, etc.
```JSON
  {
    "id": hash,
    "nombre": string,
    "descripcion": string,
    "tipo": string,
    "subtipo": string,
    "naturaleza": string
  },
```  

### 2.4 Reglas de negocio clave

* No permitir registrar un **asiento contable** si `suma(debe) != suma(haber)` (validación tanto en backend como en frontend).  
* Validar la existencia y estado activo de la **cuenta contable** antes de usarla en un asiento.  
* Cálculo de balances por período: sumar saldos por cuenta y agrupar por tipo (ACTIVO, PASIVO, etc.) para generar los estados financieros.

---

## 3. Requerimientos

### 3.1 Funcionales

* Crear asientos de diario con múltiples líneas.
* Validación automática (saldo debe = haber).
* Listado y filtrado de asientos por rango de fechas.
* Generación de Balance General y Estado de Resultados para un periodo.

### 3.2 No funcionales

* Seguridad: autenticación básica (JWT).
* Consistencia: transacciones para operaciones contables.
* Rendimiento: generación de reportes razonable para pequeñas/medianas tablas
* Usabilidad: interfaz clara que muestre totales y desfases en asientos.

---

## 4. Software

* **React** (JavaScript)
* Axios / fetch para llamadas API
* Despliegue: Vercel

---

## 5. Uso

Requisitos

- [Node.JS](https://nodejs.org/en/download)
- npm

Instalación

1. Clonar el repositorio
```bash
  git clone https://github.com/cesarleroy/bacon.git
```

2. Navegar a la carpeta e instalar dependencias
```bash
  cd bacon
  npm install
```

3. Correr el proyecto
```bash
  npm run rev
```

---

## 7. LICENCIA
