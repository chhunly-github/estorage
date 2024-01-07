import java.util.Scanner;

public class Main_StartHere {
	
	public static Hotel h;
	
	//show start menu
	public static void StartMenu(){
		Scanner sc=new Scanner(System.in);
		String choice;
		do{
			System.out.println("-------------------Welcome to Hotel Management System---------------------");
			System.out.println("1. Input Number of floor and room");
			System.out.println("2. Show Menu");
			System.out.println("3.Exit");
			System.out.print("Choose Option(1-3):");
			choice=sc.next();
			switch(choice){
			case "1":setRoomFloor();
				break;
			case "2":ManageMenu();
				break;
			case "3":System.out.println("Program Exitted!");
				System.exit(0);
				break;
			default:
				break;
			}
		}while(choice!="3");
	}
	//setup floor and room
	public static void setRoomFloor(){
		Scanner sc=new Scanner(System.in);

		while(true){
			try{
				System.out.println("Enter Amount of Floors and Rooms:");
				int num;
				num=sc.nextInt();
				System.out.println("Not Error Here");
				h=Hotel.getInstance();
				h.setFloorAndRoom(num);
				System.out.println("Successfully Setup");
				break;
			}catch(Exception ex){
				System.out.println("Error");
				//System.out.println(ex.getMessage());
				sc.next();
				continue;
			}
		}

			
	}
	
	//show management menu
	public static void ManageMenu(){
		Scanner sc=new Scanner(System.in);
		String choice;
		do{
			System.out.println("1.Check In\t2.Check Out\t3.Display\t4.Exit");
			System.out.print("Choose Option(1-4):");
			choice=sc.next();
			switch(choice){
			case "1":checkIn();
				break;
			case "2":
				break;
			case "3":h.showStatus();
				break;
			case "4":clearScreen();return;
				//break;
			default:
				break;
			}
		}while(choice!="13");
	}
	
	//clear Screen
	public static void clearScreen(){
		for(int i=0;i<100;i++){
			System.out.println();
		}
	}
	//check in
	public static void checkIn(){
		String string;
		int room,floor;
		Scanner sc=new Scanner(System.in);
		System.out.println("Enter floor(0-"+(h.getNumber()-1)+"):");	floor=sc.nextInt();
		System.out.println("Enter room(0-"+(h.getNumber()-1)+"):");		room=sc.nextInt();
		System.out.println("Enter Guest Name:");						sc.nextLine();string=sc.nextLine();
		h.checkIn(room, floor, string);
	}
	
	public static void main(String[] args){
		Main_StartHere.StartMenu();
	}
}
