// mouse.js
import { ref, onMounted, onUnmounted, Ref } from 'vue'
import { ParameterUpdatePayload, useStore } from '@/store/store';

interface Point {
  x: Ref<number>,
  y: Ref<number>
}

export function addMouseWatcher() {
  const store = useStore();

  onMounted(() => {
    let juceMouseX = 0;
    let juceMouseY = 0;

    let isMouseDown = false;

    let secondLastClickTimestamp = 0;
    let lastClickTimestamp = 0;

    // poll mouse
    setInterval(() => {
      let mouseDownThisTick = document.body.matches(':active');

      if (!isMouseDown && mouseDownThisTick) {
        let time = (new Date()).getTime();
        sendMouseEvent("imousedown");
        secondLastClickTimestamp = lastClickTimestamp;
        lastClickTimestamp = time;
      }

      else if (isMouseDown && !mouseDownThisTick) {
        let time = (new Date()).getTime();
        sendMouseEvent("imouseup");
        if (time - secondLastClickTimestamp < 350) {
          sendMouseEvent("idblclick");
        }

      }

      isMouseDown = mouseDownThisTick;

    }, 30);

    function sendMouseEvent(type: string, button: number = 0) {
        var clickEvent = new CustomEvent(type, {
          bubbles: true,
          composed: true,
          detail: {
            x: juceMouseX,
            y: juceMouseY,
            button: button
          }
        });

        let el : Element | Window | null= document.elementFromPoint(juceMouseX, juceMouseY);
        if (!el) el = window;

        el.dispatchEvent(clickEvent);
    }

    window.juceMouseMove = function(x:number, y:number) {
      updateMousePos(x, y);
    }

    if (typeof reloadState === 'function') {
      reloadState();
    }

    function updateMousePos(x: number, y:number, deltaX? : number, deltaY? : number) {
        if (!deltaX) deltaX = juceMouseX - x;
        if (!deltaY) deltaY = y - juceMouseY;
        var clickEvent = new MouseEvent("mousemove", {
          bubbles: true,
          clientX: x,
          clientY: y,
          movementX: deltaX,
          movementY: deltaY
        });

        juceMouseX = x;
        juceMouseY = y;

        window.dispatchEvent(clickEvent);
    }
  })
}

function rectContains(rect:DOMRect, x: number, y: number) {
  return rect.x <= x && x <= rect.x + rect.width &&
               rect.y <= y && y <= rect.y + rect.height;
}


export function isHovering(el : Element | null, pos : Point) {
  if (!el) return {};
  let hovering = rectContains(el.getBoundingClientRect(), pos.x.value, pos.y.value);
  return {'hover': hovering };
}