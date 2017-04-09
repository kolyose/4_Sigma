import FragmentStateDraggable from "./FragmentStateDraggable";
import FragmentStateDragged from "./FragmentStateDragged";
import FragmentStateAnchored from "./FragmentStateAnchored";
import FragmentStateInit from "./FragmentStateInit";
import FragmentStateAnchoring from "./FragmentStateAnchoring";

class FragmentStatesFactory {
  getStateDraggable(fragment) {
    return new FragmentStateDraggable(fragment, this);
  }

  getStateDragged(fragment) {
    return new FragmentStateDragged(fragment, this);
  }

  getStateAnchored(fragment) {
    return new FragmentStateAnchored(fragment, this);
  }

  getStateInit(fragment) {
    return new FragmentStateInit(fragment, this);
  }

  getStateAnchoring(fragment) {
    return new FragmentStateAnchoring(fragment, this);
  }
}

export default new FragmentStatesFactory();
