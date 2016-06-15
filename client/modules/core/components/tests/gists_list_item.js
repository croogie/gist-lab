const {describe, it, beforeEach} = global;
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {spy} from 'sinon';
import GistsListItem from '../gists_list_item.jsx';

describe('core.components.gists_list_item', () => {
  let el;

  describe('without any props passed', () => {
    beforeEach(() => {
      el = shallow(<GistsListItem />);
    });

    it(`should have default props correctly set`, () => {
      expect(el).to.have.prop('loading').equal(false);
    });

    it('should display loading data', () => {
      expect(el.find('h5.ui.header')).to.contain.text('Loading...');
    });

    it('should not display loading overlay', () => {
      expect(el.find('.indeterminate.loader')).to.not.exist;
    });
  });

  describe('passing loading prop', () => {
    it('should display loading overlay', () => {
      expect(shallow(<GistsListItem loading/>).find('.indeterminate.loader')).be.present();
    });
  });

  // here could be more test if there will be time

  describe('clicking on rendered item', () => {
    it('should call onClick function', () => {
      const onClick = spy();
      const wrapper = shallow(
        <GistsListItem onClick={onClick}/>
      );

      wrapper.simulate('click');
      expect(onClick.calledOnce).to.equal(true);
    });
  });
});
