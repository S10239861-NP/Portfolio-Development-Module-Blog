const AnimationTypes = {
    WidthExpandAnim: Symbol(),
    WidthShrinkAnim: Symbol(),
    HeightExpandAnim: Symbol(),
    HeightShrinkAnim: Symbol()
};

const DEFAULT_ANIMATION_DURATION = 10;

class IntervalState
{
    id = -1;

    constructor()
    {

    }
}

class HTMLElementSizeAnimation
{
    #currentIntervalID = -1;

    targetHTMLElement = null;

    animationType = AnimationTypes.WidthExpandAnim;

    animationDuration = DEFAULT_ANIMATION_DURATION;
    
    widthExpandAnimTickMethod = null;

    widthShrinkAnimTickMethod = null;

    heightExpandAnimTickMethod = null;

    heightShrinkAnimTickMethod = null;

    constructor()
    {

    }

    start()
    {
        let animationTickMethod = null;

        if (this.animationType == AnimationTypes.WidthExpandAnim)
        {
            animationTickMethod = this.widthExpandAnimTick;
        }
        else if (this.animationType == AnimationTypes.WidthShrinkAnim)
        {
            animationTickMethod = this.widthShrinkAnimTick;
        }
        else if (this.animationType == AnimationTypes.HeightExpandAnim)
        {
            animationTickMethod = this.heightExpandAnimTick;
        }
        else if (this.animationType == AnimationTypes.HeightShrinkAnim)
        {
            animationTickMethod = this.heightShrinkAnimTick;
        }

        if (animationTickMethod != null)
        {
            this.#currentIntervalID = setInterval(animationTickMethod, this.animationDuration);
        }
    }

    stop()
    {
        if (this.#currentIntervalID != -1)
        {
            clearInterval(this.#currentIntervalID);

            this.#currentIntervalID = -1;
        }
    }
}
