/*Este arquivo simula a conexão de um banco de dados, porém neste projeto não haverá nenhum DB já que o intuito é apenas a configuração de um ambiente de backend utilizando o nodejs. Dito isso, o conteúdo da aplicação ficará armazenada localmente no servidor em arrays, e sempre será apagada quando o servidor for interrompido. */

let Functionary = [
    {
        id: 1,
        name: "Vinícius Gonzaga Guilherme",
        occupation: "Desenvolvedor(a)",
        salary: 1200.00
    },
    {
        id: 3,
        name: "Alice Rodrigues de Oliveira",
        occupation: "Desenvolvedor(a)",
        salary: 2300.00
    }
];

let Occupation = [
    {
        id: "fwrfqe",
        occupation: "Desenvoledor(a)"
    },
    {
        id: "3n49j2",
        occupation: "Analista de Dados"
    },
    {
        id: "jruh39",
        occupation: "Designer"
    }
]

module.exports = {
    functionary: Functionary,
    occupation: Occupation
};