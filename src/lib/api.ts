export async function fetchChildren() {
    try {
      const response = await fetch('/api/children');
      if (!response.ok) throw new Error('Error al obtener la lista de niños');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  export async function registerChild(child: { name: string; age: number }) {
    try {
      const response = await fetch('/api/children', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(child),
      });
  
      if (!response.ok) throw new Error('Error al registrar el niño');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  