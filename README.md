# MARSHAL UI

## Descripción

Este proyecto es un marketplace innovador diseñado por la compra y venta de recursos digitales. Marshal UI facilita las transacciones entre creadores y compradores en tres categorías.

1. Plantillas
2. UI Kits
3. Iconos

Aprovechando la potencia de Stripe para procesar pagos, ofrecemos una experiencia de compra segura y sin complicaciones, permitiendo a los vendedores recibir pagos directamente con una comisión competitiva del 10%.

## Características Principales

- **Categorías Especializadas**: Enfoque en plantillas, UI kits e iconos para satisfacer las necesidades de diseñadores y desarrolladores.
- **Pagos Directos**: Integración con Stripe para facilitar transacciones seguras y eficientes.
- **Comisión Competitiva**: Solo un 10% de comisión, maximizando las ganancias de los vendedores.
- **Interfaz Intuitiva**: Diseño fácil de usar tanto para compradores como para vendedores.
- **Gestión de Productos**: Los vendedores pueden subir, gestionar y vender sus recursos digitales de forma sencilla.

## Levantar el desarrollo

1. Clonar el repositorio

2. Instalar dependencias

```
npm install
```

3. Crear una copia del .env.template y renombrarlo a .env y cambiar variables de entorno.

4. Crearse una cuenta de Supabase y hacer la configuración de prisma

5. Hacer el push a supabase con el siguiente comando

```
npx prisma db push
```

6. Correr el proyecto

```
npm run dev
```

## Herramientas y Tecnologías Utilizadas

- **Autenticación**: [Kinde](https://app.kinde.com/auth/cx/_:nav&m:register&psid:f105452d7044486f9f0f6125a205b3da)
- **Estilos**: [Shadcn](https://ui.shadcn.com/docs/installation)
- **Subida de Archivos**: [Uploadthing](https://uploadthing.com/)
- **Gestión de Pagos**: [Stripe](https://stripe.com/es-us)
- **Base de datos**: [Supabase](https://supabase.com/)
- **Envíos de correos**: [Resend](https://resend.com)
