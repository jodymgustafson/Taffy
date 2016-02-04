class Random
{
    static next_0To(max: number = 1): number
    {
        return Math.random() * max;
    }

    static next(min: number = 0, max: number = 1): number
    {
        var range = max - min;
        return Math.random() * range + min;
    }

    static nextInt(min: number, max: number): number
    {
        return Random.next(min, max) | 0;
    }
} 