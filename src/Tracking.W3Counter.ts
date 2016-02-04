module Tracking
{
    export class W3Counter
    {
        constructor(public id: string)
        {
            //id=46097
        }

        /** Appends the counter image to the specified element */
        public appendTo(htmlElement: HTMLElement): void
        {
            var img = document.createElement("img");
            img.src = "http://www.w3counter.com/tracker.php?id=" + this.id;
            htmlElement.appendChild(img);
        }
    }
}