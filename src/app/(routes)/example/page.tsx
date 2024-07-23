import CompareList from "@/components/compareList/CompareList";

const example = () => {
  return (
    <main className="h-dynamic-vh" id="create-deck-page">
      <div className="mx-mobile-spacing">
        <h1 className="">Example Deck</h1>
        <CompareList
          name="Example Deck"
          deckData={[
            {
              imgUrl:
                "https://upload.wikimedia.org/wikipedia/commons/f/fa/2016_Toyota_Prius_%28ZVW50L%29_Hybrid_liftback_%282016-04-02%29_01.jpg",
              name: "Toyota Prius",
            },
            {
              imgUrl:
                "https://images.prismic.io/carwow/2b4b884f-fa2b-40e2-9182-2d2c9450ac5b_37018-ThenewVolkswagenGolfeHybrid.jpg?auto=format&cs=tinysrgb&fit=crop&q=60&w=750",
              name: "Volkswagen Golf",
            },
            {
              imgUrl:
                "https://upload.wikimedia.org/wikipedia/commons/c/cb/Honda_Civic_Type_R_%28FK%3B_France%29_front_view.jpg",
              name: "Honda Civic",
            },
          ]}
        />
      </div>
    </main>
  );
};
export default example;
