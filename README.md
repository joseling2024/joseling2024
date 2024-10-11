<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Las Sagradas Escrituras</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <h1>Las Sagradas Escrituras</h1>

    <!-- Controles de texto -->
    <div id="controls">
        <button class="control-button" id="increase-font">+</button>
        <button class="control-button" id="decrease-font">-</button>
        <button class="control-button" id="toggle-dark-mode">🌓</button>
    </div>

    <div id="loading">Bienvenido</div>
    <div id="content"></div>
    
    <!-- Sección de detalles -->
    <div id="details">
        <span class="close">&times;</span>
        <div id="details-content"></div>
    </div>

    <script src="script.js"></script>
</body>
</html>
