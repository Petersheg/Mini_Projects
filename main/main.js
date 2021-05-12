const ul = document.querySelector('.nav_list');
const li = document.querySelectorAll('.nav_list-link');
const hero = document.querySelector('.hero');
const nav = document.querySelector('.nav')
const sections = document.querySelectorAll('.section');

class Animate{
    activeNavItem(){
        ul.addEventListener('click',(e)=>{
            e.preventDefault();
            let target = e.target;
        
            if(target.classList.contains('nav_list-link')){
                let att = target.getAttribute('href');
        
                li.forEach(el =>{
                    el.classList.remove('nav_item-active')
                })
        
                target.classList.add('nav_item-active');
                document.querySelector(att).scrollIntoView({behavior:'smooth'});
        
            }else{
                target.classList.remove('nav_item-active')
            }
        
            //console.log(e.target);
        });
    }

    fixNavOnScroll(){
        let navHight = nav.getBoundingClientRect();
        // Using Interset
        const intersetCallBack = function(enteries){
            const [entry] = enteries;
            if(!entry.isIntersecting){
                nav.classList.add('nav_fix');
            }else{
                nav.classList.remove('nav_fix');
            }
            //observer.unobserve(hero);
        }
        const intersetOpts = {
            root:null,
            rootMargin:`-${navHight.height}px`,
            threshold:0
        }

        const observer = new IntersectionObserver(intersetCallBack,intersetOpts);
        observer.observe(hero);
        
    }
}

function activeOnScroll4All(section){
    let elToObsserve = document.querySelector(`#${section}`);
    
    elToObsserve.classList.contains('hero') ? '' : elToObsserve.classList.add('section_hidden');

    console.log(elToObsserve);
    const intersetCallBack = function(enteries){
        const [entry] = enteries;
        let id = entry.target.id
        let elToActive = document.querySelector(`.${id}`);

        if(entry.isIntersecting === true) {
            li.forEach(el=>{
                el.classList.remove('nav_item-active')
            });

            elToActive.classList.add('nav_item-active');
            elToObsserve.classList.remove('section_hidden');
        }else{
            elToActive.classList.remove('nav_item-active');
        }
    }

    const intersetOpts = {
        root:null,
        rootMargin:'-150px',
        threshold:0.1
    };
    const observe = new IntersectionObserver(intersetCallBack,intersetOpts);

    observe.observe(elToObsserve)
}

sections.forEach(section=>{
    activeOnScroll4All(`${section.id}`);
})

const animate = new Animate;
animate.activeNavItem();
animate.fixNavOnScroll()

