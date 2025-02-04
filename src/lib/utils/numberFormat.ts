export function formatNumber(value: number | string): string {
  if (!value) return '';
  
  // Convertir a número y manejar strings
  const num = typeof value === 'string' ? parseFloat(value.replace(/[.,]/g, '')) : value;
  
  // Formatear el número usando el locale de-DE (que usa punto para miles y coma para decimales)
  return num.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Para convertir el formato visual de vuelta a número para cálculos
export function unformatNumber(value: string): number {
  if (!value) return 0;
  // Remover todos los puntos y reemplazar la coma por punto para parseFloat
  return parseFloat(value.replace(/\./g, '').replace(',', '.'));
}

// Action de Svelte para inputs numéricos
export function numberFormat(node: HTMLInputElement) {
  function formatInput() {
    const rawValue = node.value.replace(/[.,]/g, '');
    const numValue = parseFloat(rawValue) / 100;
    if (!isNaN(numValue)) {
      node.value = formatNumber(numValue);
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