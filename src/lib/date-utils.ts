export function format(date: Date | string, formatStr: string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  
  if (formatStr === 'MMM dd, yyyy') {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    return `${months[d.getMonth()]} ${d.getDate().toString().padStart(2, '0')}, ${d.getFullYear()}`
  }
  
  // Default format
  return d.toLocaleDateString()
}
