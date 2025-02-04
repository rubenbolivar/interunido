export function formatNumber(value: number | string): string {
  if (!value) return '';
  
  // Si es string y contiene coma, preservar los decimales ingresados
  if (typeof value === 'string' && value.includes(',')) {
    const [intPart, decPart] = value.split(',');
    const formattedInt = parseInt(intPart.replace(/\./g, '')).toLocaleString('de-DE');
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
  // Remover puntos y reemplazar coma por punto para parseFloat
  return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0;
}

// Action de Svelte para inputs numéricos
export function numberFormat(node: HTMLInputElement) {
  let lastValidValue = '';

  function formatInput(event?: Event) {
    let newValue = node.value.replace(/[^\d.,]/g, '');
    
    // Si hay más de una coma, mantener solo la primera
    const commaCount = (newValue.match(/,/g) || []).length;
    if (commaCount > 1) {
      const parts = newValue.split(',');
      newValue = parts[0] + ',' + parts[1];
    }

    // Si hay decimales (después de la coma)
    if (newValue.includes(',')) {
      const [intPart, decPart] = newValue.split(',');
      // Limitar decimales a 2 dígitos
      newValue = `${intPart},${decPart.slice(0, 2)}`;
    }

    try {
      // Si no hay coma, formatear con decimales automáticos
      if (!newValue.includes(',')) {
        const num = parseInt(newValue.replace(/\./g, '')) || 0;
        node.value = formatNumber(num);
      } else {
        // Si hay coma, mantener los decimales ingresados
        const [intPart, decPart] = newValue.split(',');
        const formattedInt = parseInt(intPart.replace(/\./g, '')).toLocaleString('de-DE');
        node.value = `${formattedInt},${decPart.padEnd(2, '0')}`;
      }
      lastValidValue = node.value;
    } catch (e) {
      node.value = lastValidValue;
    }
  }

  node.addEventListener('input', formatInput);
  node.addEventListener('blur', formatInput);

  return {
    destroy() {
      node.removeEventListener('input', formatInput);
      node.removeEventListener('blur', formatInput);
    }
  };
} 