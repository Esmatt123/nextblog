import Image from 'next/image'
import classes from './hero.module.css';
function Hero(){
    return <section className={classes.hero}>
        <div className={classes.image}>
            <Image src="/images/site/Esmatt.jpg" alt="An image showing Esmatt"  width={300} height={500}/>
        </div>
        <h1>
            Hi, I&apos;m Esmatt!
        </h1>
        <p>
            I blog about web development, and programming in general
        </p>
    </section>
}

export default Hero;