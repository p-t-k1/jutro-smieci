import {cleanup, screen, render, fireEvent, waitFor} from '@testing-library/react';
import Home from "../containers/Home/Home";
import {BrowserRouter} from "react-router-dom";
import { createMemoryHistory } from 'history';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('Jest kafelek o nazwie Twoja lokalizacja', () => {
    render(
        <BrowserRouter>
            <Home/>
        </BrowserRouter>
   )

    expect(screen.queryByText('Twoja lokalizacja')).toBeTruthy();

});

it('Gdy nie wybrano jeszcze lokalizacji nie da się nacisnąć kafelka innego niż pierwszy', () => {
    render(
        <BrowserRouter>
            <Home/>
        </BrowserRouter>
    )

    const history = createMemoryHistory();
    fireEvent.click(screen.queryByText('Harmonogram'));
    expect(history.location.pathname).toBe('/');

});

it('Gdy wybrano lokalizacje można nacisnąć pozostałem kafelki inne niż pierwszy', async () => {
    await AsyncStorage.setItem('area', {"_id":"63623e224d0307066ba8c7ce","firma":{"_id":"63629f204d0307066ba8c7e5","nazwa":"MPGK Tarnów"},"kodpocztowy":"33-100","komentarz":"Bez numeru 6 i 7","miejscowosc":"Tarnów","ulica":"Starodąbrowska"});

    const {container} = await render(
        <BrowserRouter>
            <Home/>
        </BrowserRouter>
    )

    const history = createMemoryHistory();
    const menuToggle = container.queryByText('Harmonogram')
    fireEvent.click(menuToggle)
    //fireEvent.click(screen.queryByText('Harmonogram'));
    expect(history.location.pathname).toBe('/harmonogram');

});
