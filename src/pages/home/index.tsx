
import style from './style.module.css'
import doggoDexImg from '../../assets/novaPokedexTec.png'

export function Home(){
    return(
        <div className='contianer'>
            <form className={style.form} action="">
                <input type="text" placeholder='Perquise por raça'/>
                <button type='submit'>Pesquisar</button>
            </form>
            <div style={{backgroundImage:`url(${doggoDexImg})`}} className={style.console}>

            </div>
        </div>
    )
}