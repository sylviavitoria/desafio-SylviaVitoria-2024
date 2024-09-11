class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(especie, quantidade) {
        if (!this.animais[especie]) {
            return { erro: "Animal inválido" };
        }
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }
    
        const { tamanho, biomas, carnivoro } = this.animais[especie];
        const tamanhoNecessario = tamanho * quantidade;
        let recintosViaveis = [];
    
        this.recintos.forEach(recinto => {
            let espacoOcupado = recinto.animais.reduce((total, a) => {
                const espacoAnimalExistente = this.animais[a.especie].tamanho;
                return total + a.quantidade * espacoAnimalExistente;
            }, 0);
    
            
            const espacoExtra = recinto.animais.length > 0 && recinto.animais.some(a => a.especie !== especie) ? 1 : 0;
            const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado - espacoExtra;
    
            const biomaEhCompativel = biomas.includes(recinto.bioma) ||
                (recinto.bioma === 'savana e rio' && biomas.includes('savana'));
            
            const podeConviver = this.verificaConvivencia(recinto, especie, carnivoro);
            const macacoPrecisaDeCompanhia = this.verificaCompanhiaMacaco(recinto, especie);
            const espacoSuficiente = espacoDisponivel >= tamanhoNecessario;
    
            if (biomaEhCompativel && espacoSuficiente && podeConviver && macacoPrecisaDeCompanhia) {
            
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - tamanhoNecessario} total: ${recinto.tamanhoTotal})`);
            }
        });
    
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }
    
        recintosViaveis.sort((a, b) => {
            const numeroA = parseInt(a.match(/Recinto (\d+)/)[1]);
            const numeroB = parseInt(b.match(/Recinto (\d+)/)[1]);
            return numeroA - numeroB;
        });
    
        return { recintosViaveis };
    }
    

    verificaConvivencia(recinto, novaEspecie, novoAnimalCarnivoro) {
        if (novoAnimalCarnivoro) {
            return recinto.animais.every(a => a.especie === novaEspecie);
        }

      
        if (recinto.animais.some(a => this.animais[a.especie].carnivoro)) {
            return false;
        }

        return true;
    }

    verificaCompanhiaMacaco(recinto, novaEspecie) {
        if (novaEspecie === 'MACACO' && recinto.animais.length === 0) {
            return true;  
        }
        return true;
    }
}

export { RecintosZoo as RecintosZoo };
