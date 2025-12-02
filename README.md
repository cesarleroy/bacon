# [📃BACON - Balance Contable Online🥓](https://bacon-beta.vercel.app/)

[![React Badge](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=for-the-badge)](https://react.dev/)
[![Vite Badge](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=for-the-badge)](https://vite.dev/)

**Versión:** 0.1

**Descripción:** **BACON** (*Balance Contable Online*) es un sistema web diseñado para registrar y clasificar cuentas, generar asientos de diario.
Su objetivo es brindar una herramienta simple, educativa y funcional que aplique principios de ingeniería de software, patrones de diseño y buenas prácticas de arquitectura.

**Objetivo:** Desarrollar un sistema con diseño modular y escalable que implemente principios de contabilidad básica y permita la evolución hacia un software financiero más completo mediante el uso del diseño en capas y patrones de diseño.

## Integrantes

- **Carmona González César Leroy**
- **Cruz Cruz Kevin Eduardo**
- **Franco Sánchez Ángel Alexis**
- **Sandoval Jiménez Rodrigo**

---

## Índice de Contenidos

- [📃BACON - Balance Contable Online🥓](#bacon---balance-contable-online)
  - [Integrantes](#integrantes)
  - [Índice de Contenidos](#índice-de-contenidos)
  - [1. Idea / Resumen del proyecto](#1-idea--resumen-del-proyecto)
  - [2. Especificaciones técnicas](#2-especificaciones-técnicas)
    - [2.1 Arquitectura general](#21-arquitectura-general)
    - [2.2 Patrones de diseño](#22-patrones-de-diseño)
    - [2.3 Modelo de datos](#23-modelo-de-datos)
    - [2.4 Reglas de negocio clave](#24-reglas-de-negocio-clave)
  - [3. Requerimientos](#3-requerimientos)
    - [3.1 Funcionales](#31-funcionales)
    - [3.2 No funcionales](#32-no-funcionales)
    - [3.3 Historias de Usuario](#33-historias-de-usuario)
      - [**HU-01: Practicar Asientos Contables**](#hu-01-practicar-asientos-contables)
      - [**HU-02: Aprender sobre Cuentas Contables**](#hu-02-aprender-sobre-cuentas-contables)
      - [**HU-03: Verificar que mi Balance Cuadre antes de Entregar**](#hu-03-verificar-que-mi-balance-cuadre-antes-de-entregar)
      - [**HU-04: Descargar mi Tarea en Formato PDF para Entregar**](#hu-04-descargar-mi-tarea-en-formato-pdf-para-entregar)
      - [**HU-05: Hacer mi Tarea desde mi Celular o Tablet**](#hu-05-hacer-mi-tarea-desde-mi-celular-o-tablet)
  - [4. Software](#4-software)
  - [5. Uso](#5-uso)
    - [Requisitos](#requisitos)
    - [Instalación](#instalación)
  - [6. Anexos](#6-anexos)
    - [6.1. Diagramas](#61-diagramas)
    - [6.2. Mockups / Wireframes](#62-mockups--wireframes)
    - [6.3. Identidad Visual](#63-identidad-visual)
  - [7. LICENCIA](#7-licencia)

---

## 1. Idea / Resumen del proyecto

Una herramienta web para llevar la contabilidad básica de un emprendedor, una persona o para prácticar y corroborar nociones básicas de la materia. La cual permite:

* Tener un **plan de cuentas** (activos, pasivos, patrimonio, ingresos, gastos).
* Registrar **asientos de diario** (debe y haber).
* Validar que cada asiento cuadre (suma del debe = suma del haber).
* Exportar reportes a PDF.

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
    "id": "hash",
    "nombre": "string",
    "descripcion": "string",
    "tipo": "string",
    "subtipo": "string",
    "naturaleza": "string"
  }
```  

### 2.4 Reglas de negocio clave

* No permitir registrar un **asiento contable** si `suma(debe) != suma(haber)` (validación tanto en backend como en frontend).  
* Validar la existencia y estado activo de la **cuenta contable** antes de usarla en un asiento.  
* Cálculo de balances por período: sumar saldos por cuenta y agrupar por tipo.

---

## 3. Requerimientos

### 3.1 Funcionales

* Crear asientos de diario con múltiples líneas.
* Validación automática (saldo debe = haber).
* Listado y filtrado de asientos por rango de fechas.

### 3.2 No funcionales

* Consistencia: transacciones para operaciones contables.
* Rendimiento: generación de reportes razonable para pequeñas/medianas tablas
* Usabilidad: interfaz clara que muestre totales y desfases en asientos.

### 3.3 Historias de Usuario

#### **HU-01: Practicar Asientos Contables**
- **Como** estudiante de contabilidad básica  
- **Quiero** registrar asientos contables de forma sencilla en un rayado diario digital  
- **Para** practicar los ejercicios de mi clase sin desperdiciar hojas impresas y poder corregir errores fácilmente

#### **HU-02: Aprender sobre Cuentas Contables**
- **Como** estudiante que apenas está aprendiendo contabilidad  
- **Quiero** ver información educativa sobre cada cuenta mientras la selecciono  
- **Para** entender qué significa cada cuenta y cuándo debo usarla sin tener que buscar en mis apuntes

#### **HU-03: Verificar que mi Balance Cuadre antes de Entregar**
- **Como** estudiante haciendo mi tarea de contabilidad  
- **Quiero** que me avisen si mis totales de Debe y Haber no coinciden  
- **Para** detectar errores antes de entregar mi tarea y no perder puntos

#### **HU-04: Descargar mi Tarea en Formato PDF para Entregar**
- **Como** estudiante que necesita entregar su tarea  
- **Quiero** descargar un PDF profesional con todos mis asientos contables  
- **Para** subirlo a la plataforma escolar o imprimirlo y entregarlo al profesor

#### **HU-05: Hacer mi Tarea desde mi Celular o Tablet**
- **Como** estudiante que no siempre tiene acceso a una computadora  
- **Quiero** poder usar la aplicación desde mi celular o tablet  
- **Para** hacer mis tareas de contabilidad en cualquier momento.

---

## 4. Software

* **React** (JavaScript)
* fetch para llamadas API
* Vercel para el despliegue
* Git para control de versiones
* GitHub como repositorio del proyecto y para documentación
* Vite como herramienta para compilar los modulos y preparar todo para el despliegue
* npm como el manejador de paquetes y dependencias

---

## 5. Uso

Basta con ir al [enlace](https://bacon-beta.vercel.app/) y realizar las operaciones deseadas, o bien si se desea clonarlo y ejecutarlo en local, seguir los siguientes pasos...

### Requisitos

- [Git](https://git-scm.com/install/)
- [npm](https://www.npmjs.com/)
- [Node.js](https://nodejs.org/en/download)

### Instalación

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

## 6. Anexos

### 6.1. [Diagramas](./anexos/diagramas)
### 6.2. [Mockups / Wireframes](./anexos/mockups)
### 6.3. [Identidad Visual](./anexos/identidad)

---

## 7. LICENCIA

Este proyecto se distribuye bajo la licencia **MIT**.

Eres libre de:
* Usar este código para fines educativos o personales.
* Modificarlo y adaptarlo a tus necesidades.
* Distribuirlo.

Bajo las siguientes condiciones:
1. Incluir el aviso de derechos de autor original.
2. El software se proporciona "tal cual", sin garantía de ningún tipo.
