import 'regenerator-runtime/runtime'
import Enzyme from 'enzyme'
import { EnzymeAdapter } from 'enzyme'

Enzyme.configure({
    adapter : new EnzymeAdapter()
})