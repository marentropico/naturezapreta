document.getElementById('Id-do-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const mensagemStatus = document.getElementById('mensagemStatus');
    
    const botao = document.getElementById('btnEnviar'); 

    
    botao.innerText = "Enviando...";
    botao.disabled = true;
    mensagemStatus.innerText = "";

    try {
        
        const resposta = await fetch('SUA_URL_AQUI', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                token: Math.random().toString(36).substring(2, 15)
            })
        });

        
        if (resposta.ok) { 
            mensagemStatus.style.color = "green";
            mensagemStatus.innerText = "Se cadastrado. Você receberá o link em alguns instantes!";
        } else {
            throw new Error("Erro no servidor");
        }

    } catch (erro) {
        console.error("Erro na requisição:", erro);
        mensagemStatus.style.color = "red";
        mensagemStatus.innerText = "Ops! Ocorreu um erro ao enviar o link. Tente novamente mais tarde.";
    
    } finally {
        botao.innerText = "Enviar Link";
        botao.disabled = false; 
    }
});