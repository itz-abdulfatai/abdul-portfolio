import ScrollReveal from 'scrollreveal'


export function scrollR (c, origin, reset, delay = 200) {
    const sr = ScrollReveal()
    
    sr.reveal('.' +c, {
      origin: origin, 
      distance: '20px', 
      duration: 1000,  
      delay: delay,  
      reset
    })
  }