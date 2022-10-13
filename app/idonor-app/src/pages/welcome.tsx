import * as React from 'react';
import logoTipo from '../images/idonor-logo.png'
import imgBraco from '../images/heart-arm.png'

const WelcomePage = (props:any) => {
    return(
        <div className='welcome-Page flex-column-mobile inter-font'>
            <img src={logoTipo} alt="Logotipo do aplicativo IDonor" title='Logotipo do aplicativo IDonor' id='logo-Idonor'/>
            <img src={imgBraco} alt="Imagem de doação de sangue" title='Imagem de doação de sangue'/>

            <div className='align-text-center welcome-texts'>
                <h2 className='inter-bold-font'>Doe sangue<br/>Salve vidas</h2>
                <p>Encontre um doador compatível<br/> em sua região</p>
            </div>
            <div className='red-circle'>
            </div>
            <br/>
           <button className='red-Button white-font inter-font' onClick={ () => props.changePage(1) }>Continuar</button>
           <br/>
           <button className='pink-Button red-font inter-font' onClick={ () => props.changePage(1) }>Inscreva-se</button>
        </div>
    )
}

export default WelcomePage;