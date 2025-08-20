
import NameHeader from '../../assets/HeaderName.png'
import style from './style.module.css'

export function Header(){
    return(
        <div className={style.container}>
            <img className={style.imgLogo} src={NameHeader} alt="NomeHeader img" />
        </div>
    )
}