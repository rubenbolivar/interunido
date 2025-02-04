export function formatNumber(value: number | string): string {
  if (!value) return '';
  
  // Si es string y contiene coma, preservar los decimales ingresados
  if (typeof value === 'string' && value.includes(',')) {
    const [intPart, decPart] = value.split(',');
    const formattedInt = parseInt(intPart.replace(/\./g, ''))?.toLocaleString('de-DE') || '0';
    return `${formattedInt},${decPart.padEnd(2, '0')}`;
  }

  // Convertir a número y formatear
  const num = typeof value === 'string' ? 
    parseFloat(value.replace(/\./g, '').replace(',', '.')) : 
    value;

  if (isNaN(num)) return '';
  
  return num.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Para convertir el formato visual de vuelta a número para cálculos
export function unformatNumber(value: string): number {
  if (!value) return 0;
  return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0;
}

// Action de Svelte para inputs numéricos
export function numberFormat(node: HTMLInputElement) {
  let lastValidValue = '';
  let lastCursorPosition = 0;

  function getNumberOfDotsBeforeCursor(value: string, cursorPos: number): number {
    return (value.slice(0, cursorPos).match(/\./g) || []).length;
  }

  function formatInput(event?: Event) {
    // Guardar la posición del cursor y el número de puntos antes del cursor
    const cursorPos = node.selectionStart || 0;
    const dotsBeforeCursor = getNumberOfDotsBeforeCursor(node.value, cursorPos);
    
    let newValue = node.value.replace(/[^\d.,]/g, '');
    
    // Permitir borrar todo el contenido
    if (!newValue) {
      node.value = '';
      lastValidValue = '';
      return;
    }

    // Si hay más de una coma, mantener solo la primera
    if (newValue.includes(',')) {
      const [intPart, ...rest] = newValue.split(',');
      newValue = `${intPart},${rest.join('')}`;
    }

    try {
      let formattedValue;
      if (newValue.includes(',')) {
        const [intPart, decPart] = newValue.split(',');
        const num = parseInt(intPart.replace(/\./g, '')) || 0;
        const formattedInt = num.toLocaleString('de-DE');
        formattedValue = `${formattedInt},${decPart.slice(0, 2)}`;
      } else {
        const num = parseInt(newValue.replace(/\./g, '')) || 0;
        formattedValue = num.toLocaleString('de-DE') + ',00';
      }

      // Actualizar el valor
      node.value = formattedValue;
      lastValidValue = formattedValue;

      // Calcular y restaurar la posición del cursor
      if (event?.type === 'input') {
        const newDotsCount = getNumberOfDotsBeforeCursor(formattedValue, cursorPos);
        const cursorOffset = newDotsCount - dotsBeforeCursor;
        const newPosition = cursorPos + cursorOffset;
        node.setSelectionRange(newPosition, newPosition);
      }
    } catch (e) {
      node.value = lastValidValue;
    }
  }

  // Manejar las teclas especiales
  function handleKeydown(event: KeyboardEvent) {
    lastCursorPosition = node.selectionStart || 0;
    
    // Permitir: backspace, delete, tab, escape, enter, puntos, comas y flechas
    if ([8, 9, 27, 13, 110, 190, 188, 37, 38, 39, 40, 46].indexOf(event.keyCode) !== -1 ||
        // Permitir: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (event.keyCode === 65 && event.ctrlKey === true) ||
        (event.keyCode === 67 && event.ctrlKey === true) ||
        (event.keyCode === 86 && event.ctrlKey === true) ||
        (event.keyCode === 88 && event.ctrlKey === true)) {
      return;
    }
    
    // Bloquear cualquier tecla que no sea número
    if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) &&
        (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();
    }
  }

  node.addEventListener('input', formatInput);
  node.addEventListener('blur', formatInput);
  node.addEventListener('keydown', handleKeydown);

  return {
    destroy() {
      node.removeEventListener('input', formatInput);
      node.removeEventListener('blur', formatInput);
      node.removeEventListener('keydown', handleKeydown);
    }
  };
} 