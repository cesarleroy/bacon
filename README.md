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
    "_comment": "por definir..."
}
```  

### 2.4 Reglas de negocio clave

* No permitir registrar un **asiento contable** si `suma(debe) != suma(haber)` (validación tanto en backend como en frontend).  
* Validar la existencia y estado activo de la **cuenta contable** antes de usarla en un asiento.  
* Cálculo de balances por período: sumar saldos por cuenta y agrupar por tipo (ACTIVO, PASIVO, etc.) para generar los estados financieros.


---

## 3. Requerimientos

### 3.1 Requerimientos de desarrollo (mínimos)

* CPU: 2 cores
* RAM: 4 GB
* Disco: 10 GB libre
* Sistema operativo: Linux / macOS / Windows

### 3.2 Requisitos funcionales

* Crear asientos de diario con múltiples líneas.
* Validación automática (saldo debe = haber).
* Listado y filtrado de asientos por rango de fechas.
* Generación de Balance General y Estado de Resultados para un periodo.

### 3.3 Requisitos no funcionales

* Seguridad: autenticación básica (JWT).
* Consistencia: transacciones para operaciones contables.
* Rendimiento: generación de reportes razonable para pequeñas/medianas tablas
* Usabilidad: interfaz clara que muestre totales y desfases en asientos.

---

## 4. Software

### 4.1 Frontend

* **React** (TypeScript)
* Tailwind CSS o Bootstrap para estilos rápidos
* Axios / fetch para llamadas API
* Librería de componentes: Headless UI / Radix

### 4.2 Backend

* **Node.js + Express**
* Alternativa: **Python + FastAPI**
* Validaciones: class-validator (TS) o Pydantic (Python)

### 4.3 Base de datos / Infra

* Docker + Docker Compose para facilitar despliegue local
* CI: GitHub Actions / GitLab CI
* Despliegue: Render / DigitalOcean / Heroku / Vercel (frontend)

### 4.4 Otras herramientas

* **Swagger / OpenAPI** para documentación de API.
* **Postman** collection para pruebas manuales.
* **Cypress / Playwright** para E2E (opcional).
* **Jest / PyTest** para tests unitarios.
* **Eslint / Prettier** para calidad de código.

---

## 5. API — Endpoints principales

### Información de las cuentas
* `GET api/accounts-info/{name/id}` - obtener la información de la cuenta para presentarla al usuario.
* `POST api/accounts-info/{name}` - registrar la información de la cuenta que ingreso el usuario.

---


## 6. Ejemplo de uso

Requisitos

- [Node.JS](https://nodejs.org/en/download)
- npm

```bash
# clonar repo
git clone https://github.com/cesarleroy/bacon.git
cd bacon
npm install
npm run rev

# otros comandos por definir...
```

---

## 7. LICENCIA
