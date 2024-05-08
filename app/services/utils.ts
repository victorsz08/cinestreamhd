export function formatDate(date?: string) { // FORMATAÇÃO DE DATA PARA MOSTRAR MÊS NO FORMATO DE NOME.
    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
      "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const partsDate = date?.split("-") || "";
    const day = partsDate[2];
    const month = partsDate[1];
    const year = partsDate[0];

    const monthName = months[parseInt(month) -1];

    return `${day} de ${monthName} de ${year}`; 
}