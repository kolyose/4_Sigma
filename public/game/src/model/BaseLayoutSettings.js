export default class BaseLayoutSettings {
  constructor(imageDimensions, rendererDimensions) {
    this.imageDimensions = imageDimensions;
    this.rendererDimensions = rendererDimensions;
  }

  getFragmentDimensionsByFragmentsNumber(fragmentsNumber) {
    const width = this.imageDimensions.width /
      this.getColumnsByFragmentsNumber(fragmentsNumber);
    const height = this.imageDimensions.height /
      this.getRowsByFragmentsNumber(fragmentsNumber);
    return { width, height };
  }

  // eslint-disable-next-line
  get scale() {}
}
