
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
	
	//check if object setup or not
	public static boolean isSetup(){
		if(instance!=null)
			return true;
		return false;
	}
	
	//set number
	public void setFloorAndRoom(int number){
		this.number=number;
		room_floor=new Object[number][number];
	}
	
	//array for storing room information
	public Object[][] getroom_floor(){
		return room_floor;
	}
	
	//check if rooms are free or not
	public boolean isThereRoomFree(){
		for(int i=0;i<number;i++){
			for(int j=0;j<number;j++){
				if(room_floor[i][j]==null)
					return true;
			}
		}	
		System.out.println("There's no rooms are free. Wait until someone check out.");
		return false;
	}
	
	//check isAllRoomFree
	public boolean isAllRoomFree(){
		for(int i=0;i<number;i++){
			for(int j=0;j<number;j++){
				if(room_floor[i][j]!=null)
					return false;
			}
		}	
		System.out.println("All rooms are free, check in first.");
		return true;
	}
	
	//check isRoomCheck
	public boolean isRoomCheck(int room, int floor){
		if(room_floor[floor][room]!=null){
			System.err.println("\n\nThe room is already checked-in. Please try another room!");
			return true;
		}
		return false;
	}
	
	//check room availability
	public boolean checkAvailability(int room, int floor){
		if(room>=number||floor>=number){
			System.err.println("\n\nYou entered invalid room or floor, Please try again!");
			return false;
		}
		
		return true;
	}
	
	//check-in
	public void checkIn(int room, int floor, String cName){
		
		if(!checkAvailability(room,floor)){
			System.out.println("---------------------------------*");
			return;
		}
		try{
			room_floor[floor][room]=new Client(cName);
			System.out.println("Successfully checked-in");
		}catch(Exception ex){
			System.out.println(ex.getMessage());
			return;
		}
//		return true;
		
	}
	//check out
	public void checkOut(int rout, int fout){
		if(room_floor[fout][rout]==null){
			System.err.println("\n\nThe room is not checked in yet");
			return;
		}
		room_floor[fout][rout]=null;
		System.out.println("The room "+rout+" on the "+fout+" floor has been successfully checked out.");
		
	}
	
	//show rooms status
	public void display(){
		for(int i=0;i<this.number;i++){
			System.out.print("Floor : "+i+"  ");
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

}
