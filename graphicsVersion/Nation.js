class Nation {
    constructor(image, x, y) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.dmg = 20;
        this.opacity = 100;
    }

    /**
     * display: populates image call with correct image for class instance
     */
    display() {
        image(this.image, this.x, this.y, 250, 250);
    }

    //images fade out as each bender dies
    /**
     * fadeOut: each bender's image fades in proportion with damage done until no longer visible.
     */
    fadeOut() {
        //cover original image
        fill("lavender");
        ellipse(this.x, this.y, 250, 250);

        //lower opacity by the amount of damage done. tint with this opacity and redraw image.
        this.opacity -= this.dmg;
        tint(255, this.opacity);
        image(this.image, this.x, this.y, 250, 250);
    }
}