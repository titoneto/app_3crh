class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user.to_json(include: :addresses), status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render json: @user.to_json(include: :addresses), status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    head :no_content
  end

  def index
    @users = User.all
    @users = @users.where("name ILIKE ?", "%#{params[:name]}%") if params[:name].present?
    @users = @users.where(cpf: params[:cpf]) if params[:cpf].present?
    @users = @users.where(birthdate: params[:birthdate]) if params[:birthdate].present?
    @users = @users.where(email: params[:email]) if params[:email].present?
    render json: @users.to_json(include: :addresses)
  end
  
  private

  def user_params
    params.require(:user).permit(:name, :email, :cpf, :birthdate, addresses_attributes: [:id, :street, :city, :state, :zip_code, :_destroy])
  end
end
