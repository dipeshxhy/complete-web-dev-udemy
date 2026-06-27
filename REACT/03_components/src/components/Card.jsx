import { Button } from './ui/button';

const Card = ({ title = 'Card Title', buttonLabel = 'Buy now' }) => {
  return (
    <div className="w-98  bg-white rounded-md text-black shadow-lg overflow-hidden transition">
      <img
        className="w-full h-auto"
        src="https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVhfGVufDB8fDB8fHww"
      />
      <div className="p-4 text-center space-y-3">
        <h2 className="text-lg font-bold ">{title}</h2>
        <p className="text-base text-gray-600">Card Description</p>
        <Button variant="default" className="w-full py-6">
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};
export default Card;
