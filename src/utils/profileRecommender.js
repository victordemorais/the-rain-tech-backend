module.exports = {
  getRecommendationQuery(userProfile) {
    let recommenderQuery = "";
    let recommenderProfileOrder = [];

    switch (userProfile) {
      case "agressive":
      case "audacious":
        recommenderProfileOrder = [
          "audacious",
          "agressive",
          "moderate",
          "conservative",
        ];
        break;
      case "moderate":
        recommenderProfileOrder = [
          "moderate",
          "conservative",
          "agressive",
          "audacious",
        ];
        break;
      default:
      case "conservative":
        recommenderProfileOrder = [
          "conservative",
          "moderate",
          "agressive",
          "audacious",
        ];
        break;
    }

    recommenderQuery = `Case investor_profile when \'${recommenderProfileOrder[0]}\' then 1 when \'${recommenderProfileOrder[1]}' then 2 when \'${recommenderProfileOrder[2]}\' then 3 when \'${recommenderProfileOrder[3]}\' then 4 end`;

    return recommenderQuery;
  },
};
