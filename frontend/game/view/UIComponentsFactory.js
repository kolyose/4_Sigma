import { Graphics, Sprite, Text } from "./../aliases";
import TinkManager from "./../utils/TinkManager";

class UIComponentsFactory {
  createButtonFromGraphics(text, color) {
    const btnBg = new Graphics();
    btnBg.lineStyle(3, 0xffffff, 0.5);
    btnBg.beginFill(color);
    btnBg.drawRoundedRect(0, 0, 100, 50, 10);
    btnBg.endFill();

    const label = this.createLabel(text, "white");
    label.x = (btnBg.width - label.width) / 2;
    label.y = (btnBg.height - label.height) / 2;

    const btn = this.createButtonFromTextures([btnBg.generateCanvasTexture()]);
    btn.addChild(label);

    return btn;
  }

  createButtonFromTextures(textures) {
    return TinkManager.createButton(textures);
  }

  createLabel(text, color) {
    const label = new Text(text, { fill: color });
    return label;
  }

  createContainer(texture) {
    const container = new Sprite(texture);
    return container;
  }

  createPopupBackground() {
    const bg = new Graphics();
    bg.lineStyle(1, 0x000000, 1);
    bg.beginFill(0xffffff);
    bg.drawRoundedRect(0, 0, 600, 300, 10);
    bg.endFill();
    return bg.generateCanvasTexture();
  }
}

export default new UIComponentsFactory();
