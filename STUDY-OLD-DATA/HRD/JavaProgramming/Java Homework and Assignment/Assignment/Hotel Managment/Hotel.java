
public class Hotel {
	private int number;
	private Object[][] room_floor;
	private static Hotel instance;
	public static Hotel getInstance(){
		if(instance ==null)
			instance=new Hotel();
		return instance;
	}
	//constructor
	private Hotel(){
	
	}
	//set number
	public void setFloorAndRoom(int number){
		this.number=number;
		room_floor=new Object[number][number];
	}
	//array for storing room information
	public Object[][] getr_f(){
		return room_floor;
	}
	//check-in
	public void checkIn(int room, int floor, String cName){
		if(room>=number||floor>=number){
			System.out.println("You entered invalid room or floor");
			return;
		}
		if(room_floor[floor][room]!=null){
			System.out.println("The room is already checked-in.");
			return;
		}try{
			room_floor[floor][room]=new Client(cName);
			System.out.println("Successfully checked-in");
		}catch(Exception ex){
			System.out.println(ex.getMessage());
		}
		
	}
	//show rooms status
	public void showStatus(){
		for(int i=0;i<this.number;i++){
			for(int j=0;j<this.number;j++){
				if(room_floor[i][j]!=null){
					System.out.print(room_floor[i][j].toString()+"\t\t");
					continue;
				}
				System.out.print("null\t\t");
			}
			System.out.println();
		}
	}
	
	//total amount of room
	public int getNumberOfRoom(){
		return number*number;
	}
	public int getNumber(){
		return number;
	}
	public static void main(String[] args){
		Hotel h=Hotel.getInstance();
		h.setFloorAndRoom(4);
		h.checkIn(1, 0, "chhunly");
		h.showStatus();
		
		h.checkIn(1, 0, "chhunly");
	}
}
