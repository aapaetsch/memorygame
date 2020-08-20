

export function getImages() {
    const images = [];
    for (let i = 1; i < 28; i++){
        images.push({
            src: `./images/green${i}.png`,
            alt: ''
        });
        images.push({
           src: `./images/red${i}.png`,
           alt: ''
        });
        images.push({
           src: `./images/purple${i}.png`,
           alt: ''
        });
    }
    return (
        images
    );
}