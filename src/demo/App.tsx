import '@navasardianmichael/gap-ui-storybook/fonts/CentraNo2/kit.css';
import '@navasardianmichael/gap-ui-storybook/fonts/ChronicleDisplay/kit.css';
import './App.css';
import Fonts from './components/Fonts';

const App = () => {
  return (
    <div className="gap-ui-kit flex flex-col gap-8 p-8">
      <h1 className="font-bold text-6xl text-center">GAP UI Storybook</h1>
      <hr />
      <Fonts />
    </div>
  );
};

export default App;
